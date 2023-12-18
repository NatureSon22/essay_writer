import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRobot } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"

export default function NavBar() {
    return (
        <header className="header">
            <div className="header-logo">
                <FontAwesomeIcon className="logo" icon={faRobot} />
                <p>write_me</p>
            </div>
            
            <a className="header-link" href="https://github.com/NatureSon22/essay_writer">
                <FontAwesomeIcon icon={faGithub} />
            </a>
        </header>
    )
}
