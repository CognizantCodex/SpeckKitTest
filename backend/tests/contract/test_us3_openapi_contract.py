from pathlib import Path


def test_us3_brief_contract_is_documented():
    contract = Path(__file__).resolve().parents[3] / "specs/001-multimodal-insights/contracts/openapi.yaml"
    text = contract.read_text(encoding="utf-8")

    assert "operationId: createBrief" in text
    assert "operationId: listBriefs" in text
