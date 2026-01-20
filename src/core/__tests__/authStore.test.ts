// src/core/__tests__/authStore.test.ts
import { useAuthStore } from "../authStore";

describe("AuthStore", () => {
  it("should initialize with null session", () => {
    const state = useAuthStore.getState();
    expect(state.session).toBeNull();
  });

  it("should set session correctly", () => {
    const mockSession = { user: { id: "123" }, access_token: "abc" } as any;
    useAuthStore.getState().setSession(mockSession);
    expect(useAuthStore.getState().session).toEqual(mockSession);
  });

  it("should clear session on signOut", () => {
    useAuthStore.getState().signOut();
    expect(useAuthStore.getState().session).toBeNull();
  });
});
