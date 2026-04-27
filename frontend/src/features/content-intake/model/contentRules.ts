import type { ContentItem, ContentType, ValidationStatus } from "../../../services/contracts";

export const MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024;
export const MAX_AV_DURATION_SECONDS = 2 * 60 * 60;

const MEDIA_BY_EXTENSION: Record<string, { contentType: ContentType; mediaType: string }> = {
  pdf: { contentType: "document", mediaType: "application/pdf" },
  docx: { contentType: "document", mediaType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
  txt: { contentType: "document", mediaType: "text/plain" },
  csv: { contentType: "document", mediaType: "text/csv" },
  png: { contentType: "image", mediaType: "image/png" },
  jpg: { contentType: "image", mediaType: "image/jpeg" },
  jpeg: { contentType: "image", mediaType: "image/jpeg" },
  tif: { contentType: "image", mediaType: "image/tiff" },
  tiff: { contentType: "image", mediaType: "image/tiff" },
  mp3: { contentType: "audio", mediaType: "audio/mpeg" },
  wav: { contentType: "audio", mediaType: "audio/wav" },
  m4a: { contentType: "audio", mediaType: "audio/mp4" },
  mp4: { contentType: "video", mediaType: "video/mp4" },
  mov: { contentType: "video", mediaType: "video/quicktime" }
};

export interface CandidateFile {
  name: string;
  size: number;
  durationSeconds?: number;
}

export function validateCandidateFile(
  workspaceId: string,
  candidate: CandidateFile,
  seenChecksums: Set<string>
): ContentItem {
  const extension = candidate.name.split(".").pop()?.toLowerCase() ?? "";
  const media = MEDIA_BY_EXTENSION[extension];
  const checksum = `${candidate.name}:${candidate.size}`;
  const status = resolveValidationStatus(candidate, media !== undefined, seenChecksums.has(checksum));

  if (status === "valid") {
    seenChecksums.add(checksum);
  }

  return {
    id: `content-${checksum.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`,
    workspaceId,
    displayName: candidate.name,
    contentType: media?.contentType ?? "document",
    mediaType: media?.mediaType ?? "application/octet-stream",
    filePath: `data/uploads/${candidate.name}`,
    fileSizeBytes: candidate.size,
    durationSeconds: candidate.durationSeconds,
    checksum,
    validationStatus: status,
    processingStatus: status === "valid" ? "queued" : "skipped",
    restrictionStatus: "none",
    failureReason: failureReason(status)
  };
}

function resolveValidationStatus(
  candidate: CandidateFile,
  supported: boolean,
  duplicate: boolean
): ValidationStatus {
  if (!supported) {
    return "unsupported";
  }
  if (candidate.size <= 0) {
    return "empty";
  }
  if (candidate.size > MAX_FILE_SIZE_BYTES) {
    return "failed";
  }
  if (candidate.durationSeconds && candidate.durationSeconds > MAX_AV_DURATION_SECONDS) {
    return "failed";
  }
  if (duplicate) {
    return "duplicate";
  }
  return "valid";
}

function failureReason(status: ValidationStatus): string {
  const reasons: Record<ValidationStatus, string> = {
    pending: "",
    valid: "",
    unsupported: "Unsupported file type.",
    corrupted: "File appears corrupted.",
    encrypted: "Encrypted files are not supported in this release.",
    empty: "File is empty.",
    duplicate: "Duplicate content item.",
    failed: "File exceeds first-release limits.",
  };
  return reasons[status];
}
