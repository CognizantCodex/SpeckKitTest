export type WorkspaceStatus = "draft" | "ready" | "generating" | "reviewing" | "brief_ready" | "archived";
export type ContentType = "document" | "image" | "audio" | "video";
export type ValidationStatus = "pending" | "valid" | "unsupported" | "corrupted" | "encrypted" | "empty" | "duplicate" | "failed";
export type ProcessingStatus = "not_started" | "queued" | "processing" | "processed" | "partial" | "failed" | "skipped";
export type RestrictionStatus = "none" | "restricted" | "unavailable";
export type Relevance = "high" | "medium" | "low";
export type Confidence = "high" | "medium" | "low" | "unknown";
export type ReviewStatus = "unreviewed" | "approved" | "duplicative" | "irrelevant" | "follow_up";
export type InsightSetStatus = "queued" | "generating" | "completed" | "partial" | "failed" | "cancelled";
export type BriefStatus = "draft" | "ready" | "shared" | "exported" | "blocked";

export interface Workspace {
  id: string;
  name: string;
  description: string;
  status: WorkspaceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ContentItem {
  id: string;
  workspaceId: string;
  displayName: string;
  contentType: ContentType;
  mediaType: string;
  filePath: string;
  fileSizeBytes: number;
  durationSeconds?: number;
  checksum: string;
  validationStatus: ValidationStatus;
  processingStatus: ProcessingStatus;
  restrictionStatus: RestrictionStatus;
  failureReason?: string;
}

export interface EvidenceReference {
  id: string;
  insightId: string;
  contentItemId: string;
  referenceType: "page" | "region" | "timestamp" | "segment" | "file" | "unknown";
  referenceLabel: string;
  excerpt: string;
  confidenceContext: string;
}

export interface Insight {
  id: string;
  insightSetId: string;
  statement: string;
  relevance: Relevance;
  confidence: Confidence;
  originatingContentType: ContentType;
  reviewStatus: ReviewStatus;
  duplicateGroupId?: string;
  rank: number;
  evidence: EvidenceReference[];
}

export interface InsightSet {
  id: string;
  workspaceId: string;
  status: InsightSetStatus;
  summary: string;
  failureSummary?: string;
  insights: Insight[];
}

export interface BriefWarning {
  sourceId: string;
  message: string;
}

export interface InsightBrief {
  id: string;
  workspaceId: string;
  title: string;
  summary: string;
  insightIds: string[];
  status: BriefStatus;
  warnings: BriefWarning[];
  createdAt: string;
  sharedAt?: string;
  exportedAt?: string;
}
