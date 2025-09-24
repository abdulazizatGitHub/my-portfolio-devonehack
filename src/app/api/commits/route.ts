// src/app/api/commits/route.ts
import { NextRequest } from "next/server";

type CachedCommits = {
  ts: number;
  payload: any;
};

let cache: CachedCommits | null = null;
const TTL = 1000 * 60 * 10; // 10 minutes

export async function GET(req: NextRequest) {
  const now = Date.now();
  if (cache && now - cache.ts < TTL) {
    return new Response(JSON.stringify(cache.payload), { status: 200 });
  }

  const username = process.env.GITHUB_USERNAME!;
  const token = process.env.GITHUB_TOKEN!;

  if (!username || !token) {
    return new Response(
      JSON.stringify({ error: "Missing GITHUB_USERNAME or GITHUB_TOKEN" }),
      { status: 500 }
    );
  }

  try {
    const headers = {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    };

    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
            commitContributionsByRepository(maxRepositories: 100) {
              contributions(first: 100) {
                totalCount
              }
            }
          }
        }
      }
    `;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: "GitHub GraphQL request failed" }),
        { status: res.status }
      );
    }

    const json = await res.json();
    const data = json.data?.user?.contributionsCollection;

    if (!data) {
      return new Response(JSON.stringify({ error: "No contribution data" }), {
        status: 500,
      });
    }

    const total = data.contributionCalendar.totalContributions;
    const commits = data.commitContributionsByRepository.reduce(
      (acc: number, repo: any) => acc + repo.contributions.totalCount,
      0
    );

    const payload = {
      yearly: commits,
      totalContributions: total,
      lastUpdated: new Date().toISOString(),
    };

    cache = { ts: now, payload };

    return new Response(JSON.stringify(payload), { status: 200 });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message ?? String(err) }),
      { status: 500 }
    );
  }
}
