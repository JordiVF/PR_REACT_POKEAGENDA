function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      type="button"
    >
      {dark ? '☀️ Modo claro' : '🌙 Modo oscuro'}
    </button>
  );
}

export default ThemeToggle;