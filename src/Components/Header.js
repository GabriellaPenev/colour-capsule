const Header = () => {
    return (
        <header className="animate__animated animate__fadeIn">
            <h1>
                <a href="https://colourcapsule.netlify.app/">
                    <span className='title firstColor'>Colour </span>
                    <span className='title secondColor'>Capsule</span>
                </a>
            </h1>
            <div className="intro">
                <span className="introSpan">Pick 5 colours of your choice to create a custom colour capsule, and then use your colours to draw on the blank canvas below!</span>
            </div>
        </header>
    )
}

export default Header;