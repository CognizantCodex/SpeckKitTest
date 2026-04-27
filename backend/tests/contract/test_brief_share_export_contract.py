from pathlib import Path


def test_share_and_export_routes_are_documented():
    contract = Path(__file__).resolve().parents[3] / "specs/001-multimodal-insights/contracts/openapi.yaml"
    text = contract.read_text(encoding="utf-8")

    assert "operationId: shareBrief" in text
    assert "operationId: exportBrief" in text
