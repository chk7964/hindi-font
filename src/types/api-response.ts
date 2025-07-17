/* eslint-disable no-unused-vars */
export interface apiResponse {
  success: boolean;
  data: any | null;
  message: string | null;
}

export enum ApiResponseMessage {
  InternalServerError = "Internal Server Error",
}

export type DynamicRouteSegmentConfig =
  | "auto"
  | "force-dynamic"
  | "error"
  | "force-static";

export type RuntimeRouteSegmentConfig = "nodejs" | "edge";
