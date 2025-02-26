from promptflow.core import tool

@tool
def context(citations: object, strategies: object) -> str:
  return {"citations": citations, "strategies": strategies}