const JOBS_API_URL = "https://www.arbeitnow.com/api/job-board-api";

export async function fetchMarketJobs(targetRole, signal) {
  const response = await fetch(JOBS_API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Market data request failed with status ${response.status}.`);
  }

  const payload = await response.json();
  const jobs = Array.isArray(payload.data) ? payload.data : [];
  const roleTerms = targetRole.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

  return jobs
    .filter((job) => {
      const searchableText = `${job.title || ""} ${job.description || ""}`.toLowerCase();
      return roleTerms.some((term) => searchableText.includes(term));
    })
    .slice(0, 12)
    .map((job) => ({
      id: job.slug || job.url || job.title,
      title: job.title || "Open position",
      company: job.company_name || "Hiring organization",
      location: job.location || "Location not specified",
      url: typeof job.url === "string" && job.url.startsWith("http")
        ? job.url
        : "",
      remote: Boolean(job.remote),
    }));
}
