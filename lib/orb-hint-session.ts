export const ORB_HINT_DELAY_MS = 30 * 60 * 1000;
export const ORB_HINT_STORAGE_KEY = "0xpacman:orb-hint:v1";

export type OrbHintStatus = "waiting" | "shown" | "dismissed" | "discovered";

export type OrbHintSession = {
  version: 1;
  elapsedMs: number;
  status: OrbHintStatus;
};

const statusOrder: Record<OrbHintStatus, number> = {
  waiting: 0,
  shown: 1,
  dismissed: 2,
  discovered: 3,
};

function emptySession(): OrbHintSession {
  return { version: 1, elapsedMs: 0, status: "waiting" };
}

/** Only elapsed viewing time is persisted; wall-clock timestamps are never resumed. */
export function readOrbHintSession(raw: string | null | undefined): OrbHintSession {
  if (!raw) return emptySession();
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return emptySession();
    }
    const session = value as Partial<OrbHintSession>;
    if (
      session.version !== 1 ||
      typeof session.elapsedMs !== "number" ||
      !Number.isFinite(session.elapsedMs) ||
      session.elapsedMs < 0 ||
      typeof session.status !== "string" ||
      !Object.hasOwn(statusOrder, session.status)
    ) {
      return emptySession();
    }
    return {
      version: 1,
      elapsedMs: Math.min(session.elapsedMs, ORB_HINT_DELAY_MS),
      status: session.status,
    };
  } catch {
    return emptySession();
  }
}

/** The caller supplies the elapsed interval and whether that interval was foreground. */
export function advanceOrbHintSession(
  session: OrbHintSession,
  deltaMs: number,
  foreground: boolean,
): OrbHintSession {
  if (
    !foreground ||
    session.status !== "waiting" ||
    !Number.isFinite(deltaMs) ||
    deltaMs <= 0
  ) {
    return session;
  }
  return {
    ...session,
    elapsedMs: Math.min(ORB_HINT_DELAY_MS, session.elapsedMs + deltaMs),
  };
}

export function isOrbHintDue(session: OrbHintSession): boolean {
  return session.status === "waiting" && session.elapsedMs >= ORB_HINT_DELAY_MS;
}

/** A shown hint never becomes eligible again, even after navigation or reload. */
export function markOrbHintSession(
  session: OrbHintSession,
  status: Exclude<OrbHintStatus, "waiting">,
): OrbHintSession {
  return statusOrder[status] > statusOrder[session.status]
    ? { ...session, status }
    : session;
}
