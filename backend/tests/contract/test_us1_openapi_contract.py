from pathlib import Path

from scripts.validate_openapi import validate


def test_openapi_contract_contains_required_operations():
    contract = Path(__file__).resolve().parents[3] / "specs/001-multimodal-insights/contracts/openapi.yaml"

    assert validate(contract) == []
