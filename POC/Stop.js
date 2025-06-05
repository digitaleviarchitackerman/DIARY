(() => {
  const toYAML = (obj) => {
    const indent = (str, spaces) =>
      str
        .split("\n")
        .map((line) => " ".repeat(spaces) + line)
        .join("\n");

    const dump = (o, level = 0) => {
      if (Array.isArray(o)) {
        return o
          .map((item) => "- " + dump(item, level + 2).trim())
          .join("\n")
          .replace(/\n- /g, "\n- ");
      } else if (typeof o === "object" && o !== null) {
        return Object.entries(o)
          .map(
            ([k, v]) =>
              `${k}: ${
                typeof v === "object" ? "\n" + indent(dump(v, level + 2), 2) : v
              }`
          )
          .join("\n");
      } else {
        return String(o);
      }
    };

    return dump(obj);
  };

  const diary = {
    session_id: "diary-" + new Date().toISOString(),
    started_at: window.__DIARY_START__,
    ended_at: new Date().toISOString(),
    events: window.__DIARY_LOG__ || []
  };

  const yaml = toYAML(diary);
  const blob = new Blob([yaml], { type: "text/yaml" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `diary-${new Date().toISOString().replace(/[:.]/g, "-")}.yaml`;
  a.click();

  alert("✅ DIARY recording stopped and YAML downloaded.");
})();
