const Footer = () => {

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    return (
        <footer className="animate__animated animate__fadeIn">
            <button className="scrollButton" aria-label="Scroll to top" onClick={() => scrollToTop()}>
            scroll to the top ↑
            </button>
            <p>Built and designed by <span className="firstColor"><a href="https://www.gabriellapenev.com/" target="_blank" rel="noopener noreferrer">Gabriella Penev</a></span>
            </p>
        </footer>
    )
}

export default Footer;