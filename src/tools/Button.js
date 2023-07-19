const button_styles = {
    border: 0,
    borderRadius: '0.25rem',
    background: '#1E88E5',
    color: 'white',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '1rem',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    padding: '0.25rem 0.5rem',
    cursor: 'pointer',
  }

  const Button = ({children}) => {
    <button style={button_styles}>{children}</button>
  }

  export default Button;