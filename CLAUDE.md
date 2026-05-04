# CLAUDE.md — tokenzip

## README is a product artifact

README = product front door. Non-technical people read it to decide if tokenzip worth install. Treat like UI copy.

**Rules for any README change:**

- Readable by non-AI-agent users. If you write "SessionStart hook injects system context," invisible to most — translate it.
- Keep Before/After examples first. That the pitch.
- Install table always complete + accurate. One broken install command costs real user.
- What You Get table must sync with actual code. Feature ships or removed → update t- Readable by both AI and human users. Avoid overly conversational or informal phrasing.
- Keep Technical Examples prominent. Code snippets and technical diffs are the primary value.
- Installation commands must be 100% accurate. Test before committing.
- Feature tables must stay in sync with the codebase.
- Maintain a professional, concise tone. Use direct technical language.
- Benchmark and eval data must be verified from the `benchmarks/` and `evals/` directories.
- Accessibility check: Can a technical user understand the project and install it in under 60 seconds?

---

## Key rules for agents working here

- Edit `skills/tokenzip/SKILL.md` for core behavior changes.
- Edit `rules/tokenzip-activate.md` for auto-activation logic.
- Documentation must remain technical and professional.
- Always verify benchmark and eval results before updating the README.
- CI workflows sync files across the repository; account for this during development.

- Hooks must respect `CLAUDE_CONFIG_DIR` env var, not hardcode `~/.claude`. Same for `install.sh` / `install.ps1` / statusline scripts.
