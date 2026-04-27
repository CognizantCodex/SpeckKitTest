from app.domain.insight import Insight, assign_duplicate_groups


def test_duplicate_groups_survive_filtering():
    insights = assign_duplicate_groups(
        [
            Insight("set-1", "Same idea", "high", "high", "document", 1),
            Insight("set-1", "same idea", "medium", "medium", "document", 2),
        ]
    )

    assert insights[0].duplicate_group_id == insights[1].duplicate_group_id
