import { joinURL } from "ufo";
import { API_BASE } from "./consts";
import { onMount } from "svelte";

export interface Member {
  id: string;
  name: string;
  url: string;
  buttonUrl: string;
}

export type EmbedResponse = {
  current: Member;
  prev: Member;
  next: Member;
  members: Member[];
};
export async function getEmbed() {
  const res = await fetch(joinURL(API_BASE, "/embed"), {
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch /embed: ${res.status}`);
  }
  const data = await res.json();
  return data as EmbedResponse;
}

export default function useEmbed() {
  let data = $state.raw<EmbedResponse | null>(null);

  onMount(async () => {
    const res = await fetch(joinURL(API_BASE, "/embed"), {
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch /embed: ${res.status}`);
    }
    data = await res.json();
  });

  return {
    get data() {
      return data;
    },
  };
}

export async function getStatus() {
  const res = await fetch(joinURL(API_BASE, "/embed/status"), {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch /embed/status: ${res.status}`);
  }

  const data = await res.json();
  return data as { enabled: boolean };
}
export async function setStatus({ enabled }: { enabled: boolean }) {
  const res = await fetch(joinURL(API_BASE, "/embed/status"), {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ enabled }),
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`Failed to set /embed/status: ${res.status}`);
  }
}
