/** A milk drop for the glass, with the paper slip in front and shorter. */
export function Logo() {
  return (
    <svg className="landing-logo" viewBox="0 0 32 32" aria-hidden="true">
      <path
        className="logo-drop"
        d="M12.2 2.4C8.4 8.6 5.6 13.6 5.6 18.6 5.6 23.8 8.6 27.8 12.2 27.8 15.8 27.8 18.8 23.8 18.8 18.6 18.8 13.6 16 8.6 12.2 2.4Z"
      />
      <rect className="logo-slip" x="15.2" y="15.6" width="14" height="12.2" rx="1.8" />
      <path className="logo-rule" d="M17.8 19.5h8.2M17.8 22.9h5.2" />
    </svg>
  )
}
