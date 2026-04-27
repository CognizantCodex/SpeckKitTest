from pathlib import Path


def test_us2_review_contract_is_documented():
    contract = Path(__file__).resolve().parents[3] / "specs/001-multimodal-insights/contracts/openapi.yaml"
    text = contract.read_text(encoding="utf-8")

    assert "operationId: updateInsightReview" in text
    assert "operationId: listInsightEvidence" in text
