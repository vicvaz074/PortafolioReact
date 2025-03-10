import React, { useState, useCallback } from 'react';
import { Container, Navbar, Nav, Row, Col, Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLinkedin, FaGithub, FaArrowRight, FaReact, FaNodeJs, FaPython, FaDatabase, FaGlobeAmericas, FaUsers, FaLaptopCode } from 'react-icons/fa';
import logoTec from './img/logotec.jpg';
import './App.css';
import emailjs from 'emailjs-com';
import useScript from './useScript';
import hackatonImage from './img/hackaton.png';
import sistemaAutomatizadoImage from './img/qbot.png';
import maquinaRemoImage from './img/remadora.png';
import prediccionContaminantesImage from './img/regresionlineal.png';
import aplicacionCrudImage from './img/crud.png';
import kosmoImage from './img/kosmo.png';
import camionElectricoImage from './img/camion.png';
import encriptadorImage from './img/encriptador.png';
import tetrisPythonImage from './img/tetris.png';
import desarrolloVideojuegoUnityImage from './img/unity.png';
import curriculmSpanish from './img/Curriculum.pdf';


function sendEmail(e) {
  e.preventDefault();

  // Recoger los valores de los campos
  const nombre = e.target.from_name.value;
  const email = e.target.from_email.value;
  const mensajeUsuario = e.target.message.value;
  
  // Construir el mensaje completo incluyendo nombre y email
  const mensajeCompleto = `Nombre: ${nombre}, Email: ${email}, Mensaje: ${mensajeUsuario}`;

  // Crear el objeto de parámetros para enviar
  const templateParams = {
    from_name: nombre, // Opcional, si aún quieres enviarlo como un campo separado
    from_email: email, // Opcional, por la misma razón
    message: mensajeCompleto, // El mensaje incluye todo ahora
    to_name: "Administrador" // Este es el destinatario, ajusta según sea necesario
  };

  // Utilizar emailjs.send en lugar de sendForm para enviar el objeto personalizado
  emailjs.send('service_w6lwqo2', 'template_1thethc', templateParams, 'QGSc5jsPsYfsiYScA')
    .then((result) => {
        console.log(result.text);
        alert('Mensaje enviado con éxito!');
    }, (error) => {
        console.log(error.text);
        alert('Error al enviar el mensaje, intenta de nuevo.');
    });

  // Resetear el formulario después del envío
  e.target.reset();
}




function App() {
  const [darkMode, setDarkMode] = useState(false);
  const googleTranslateElementInit = useCallback(() => {
    new window.google.translate.TranslateElement({
      pageLanguage: 'es',
      layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  }, []);

  useScript('//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit', googleTranslateElementInit);

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Navbar bg="dark-bg" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="#home">Vicente Vázquez</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#header">Inicio</Nav.Link>
            <Nav.Link href="#about">Sobre Mí</Nav.Link>
            <Nav.Link href="#skills">Habilidades</Nav.Link>
            <Nav.Link href="#portfolio">Portafolio</Nav.Link>
            <Nav.Link href="#projects">Proyectos</Nav.Link>
            <Nav.Link href="#contact">Contacto</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </Button>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-5" id="header">
        <Row className="justify-content-md-center">
          <Col xs={12} md={8}>
            <h1 className="text-center">Bienvenido a Mi Portafolio</h1>
            <p className="text-center">Soy Vicente Vázquez Ramírez, estudiante de Ingeniería Mecatrónica apasionado por la tecnología, la simulación y la IA.</p>
          </Col>
        </Row>
      </Container>

      <Container className="my-5" id="about">
        <Row>
          <Col md={4}>
          <img src={logoTec} alt="Imagen de perfil" style={{ width: '100%', borderRadius: '10%' }} />
          </Col>
          <Col md={8}>
            <h2>Sobre Mí</h2>
            <p>Soy Ingeniero en Mecatrónica graduado del Tecnológico de Monterrey (2024), con experiencia en desarrollo Fullstack, Inteligencia Artificial y automatización industrial. Me especializo en crear soluciones innovadoras combinando desarrollo web, IA aplicada y tecnologías en la nube. Actualmente, lidero el desarrollo de una herramienta de IA para apoyo legal en Davara Abogados, colaborando con Microsoft. Este proyecto involucra desarrollo completo (Front-End y Back-End) y la integración de Azure AI para optimizar procesos legales.</p>
          </Col>
        </Row>
        <div id="google_translate_element"></div>
      </Container>

      <Container className="my-5" id="skills">
        <Row>
          <Col xs={12} md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Desarrollo Web <FaReact /></Card.Title>
                <Card.Text>
                  Profundo conocimiento en React, avanzado en JavaScript, HTML5, y CSS3. Creación de interfaces dinámicas, sitios web responsivos y optimizados para SEO.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Backend & API <FaNodeJs /></Card.Title>
                <Card.Text>
                  Desarrollo backend con Node.js y Express, creación de APIs RESTful, manejo de autenticación JWT y OAuth. Integración eficiente con bases de datos MongoDB y PostgreSQL.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Machine Learning <FaPython /></Card.Title>
                <Card.Text>
                  Proyectos de machine learning utilizando TensorFlow y PyTorch. Experiencia en análisis de datos con Pandas y NumPy. Automatización de tareas con scripts Python.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Base de Datos <FaDatabase /></Card.Title>
                <Card.Text>
                  Experiencia avanzada en diseño y optimización de bases de datos SQL y NoSQL. Implementación de soluciones de almacenamiento de datos escalables y seguras.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Idiomas & Certificaciones <FaGlobeAmericas /></Card.Title>
                <Card.Text>
                  Fluidez en inglés y francés, con certificaciones oficiales (TOEFL Junior Plata, PET con méritos). Experiencia intercultural y comunicación efectiva en entornos multilingües.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Liderazgo & Emprendimiento <FaUsers /></Card.Title>
                <Card.Text>
                  Presidente del Consejo Estudiantil, liderazgo demostrado en proyectos de emprendimiento. Excelentes habilidades de comunicación, presentación y negociación.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Habilidades Técnicas Avanzadas <FaLaptopCode /></Card.Title>
                <Card.Text>
                  Dominio de una amplia gama de tecnologías de software y hardware, incluyendo desarrollo en múltiples lenguajes de programación, manejo de PLCs, y diseño asistido por computadora con SolidWorks y Unity.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>


      <Container className="my-5" id="projects">
      <Row>
        <Col>
          <h2>Proyectos Destacados</h2>
          <p>Aquí se encuentran algunos de los proyectos en los que he trabajado, que abarcan desde desarrollo web hasta inteligencia artificial y mecatrónica.</p>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Img variant="top" src={hackatonImage} />
            <Card.Body>
              <Card.Title>Hackaton Tec de Monterrey Reto Liverpool</Card.Title>
              <Card.Text>
                Lideré y desarrollé un chatbot como parte del reto Liverpool, enfocándome en el backend y el desarrollo web, involucrando tecnologías de frontend.
              </Card.Text>
              <Card.Text>
                <small className="text-muted">Tecnologías usadas: Node.js, React, Dialogflow</small>
              </Card.Text>
              <Button variant="primary" href="https://hackaton-v2.vercel.app/">Ver Proyecto <FaArrowRight /></Button>
            </Card.Body>
          </Card>
        </Col>
        {/* Repite la estructura anterior para cada proyecto, actualizando la información según corresponda */}
        <Col md={6}>
          <Card className="mb-3">
            <Card.Img variant="top" src={sistemaAutomatizadoImage} />
            <Card.Body>
              <Card.Title>Sistema Automatizado de Transporte de Materiales</Card.Title>
              <Card.Text>
                Contribuí en la creación de un sistema automatizado para una fábrica, desde la identificación de requisitos hasta la programación del sistema.
              </Card.Text>
              <Card.Text>
                <small className="text-muted">Tecnologías usadas: C++, Arduino, Sensores IR</small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Img variant="top" src={maquinaRemoImage} />
            <Card.Body>
              <Card.Title>Máquina de Remo Deportivo con Microcontroladores</Card.Title>
              <Card.Text>
                Desarrollé una máquina de remo deportiva, seleccionando componentes, diseñando el sistema de control y programando los microcontroladores.
              </Card.Text>
              <Card.Text>
                <small className="text-muted">Tecnologías usadas: Microcontroladores, Diseño CAD</small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Img variant="top" src={prediccionContaminantesImage} />
            <Card.Body>
              <Card.Title>Predicción Estadística de Contaminantes</Card.Title>
              <Card.Text>
                Implementé sistemas de regresión lineal y múltiple para predecir la concentración de contaminantes, utilizando Minitab para el análisis estadístico.
              </Card.Text>
              <Card.Text>
                <small className="text-muted">Tecnologías usadas: Minitab, Regresión Lineal</small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Img variant="top" src={aplicacionCrudImage} />
            <Card.Body>
              <Card.Title>Aplicación CRUD</Card.Title>
              <Card.Text>
                Desarrollo de una aplicación CRUD para gestión de datos, implementada con React y Node.js, enfocada en la eficiencia y seguridad de la información.
              </Card.Text>
              <Card.Text>
                <small className="text-muted">Tecnologías usadas: React, Node.js, MongoDB</small>
              </Card.Text>
              <Button variant="primary" href="https://vicvaz074.github.io/crud/">Ver Proyecto <FaArrowRight /></Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Img variant="top" src={kosmoImage} />
            <Card.Body>
              <Card.Title>Kosmo - Comercio Electrónico</Card.Title>
              <Card.Text>
                Creación de Kosmo, una plataforma de comercio electrónico basada en chatbots para mejorar la experiencia de compra, utilizando tecnologías de IA.
              </Card.Text>
              <Card.Text>
                <small className="text-muted">Tecnologías usadas: Python, Flask, Chatbot AI</small>
              </Card.Text>
              <Button variant="primary" href="https://kosmoprueba.vercel.app/">Ver Proyecto <FaArrowRight /></Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Img variant="top" src={camionElectricoImage} />
            <Card.Body>
              <Card.Title>Diseño de Camión Eléctrico</Card.Title>
              <Card.Text>
                Participé en el diseño y desarrollo de un camión eléctrico, enfocándome en la integración de sistemas eléctricos y la optimización de la eficiencia energética.
              </Card.Text>
              <Card.Text>
                <small className="text-muted">Tecnologías usadas: Sistemas eléctricos, CAD, Simulación energética</small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Img variant="top" src={encriptadorImage} />
            <Card.Body>
              <Card.Title>Encriptador de Mensajes</Card.Title>
              <Card.Text>
                Desarrollo de una aplicación de escritorio para la encriptación de mensajes, utilizando algoritmos avanzados para asegurar la privacidad de la información.
              </Card.Text>
              <Card.Text>
                <small className="text-muted">Tecnologías usadas: Java, Criptografía</small>
              </Card.Text>
              <Button variant="primary" href="https://vicvaz074.github.io/Encriptador-de-texto/">Ver Proyecto <FaArrowRight /></Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Img variant="top" src={tetrisPythonImage} />
            <Card.Body>
              <Card.Title>Tetris en Python</Card.Title>
              <Card.Text>
                Implementación del juego clásico Tetris utilizando Python, centrándome en la lógica del juego y la interfaz de usuario gráfica.
              </Card.Text>
              <Card.Text>
                <small className="text-muted">Tecnologías usadas: Python, Pygame</small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Img variant="top" src={desarrolloVideojuegoUnityImage} />
            <Card.Body>
              <Card.Title>Desarrollo de Videojuego con Unity</Card.Title>
              <Card.Text>
                Colaboré en el desarrollo de un videojuego utilizando Unity, trabajando en el diseño de niveles, programación de mecánicas de juego y optimización.
              </Card.Text>
              <Card.Text>
                <small className="text-muted">Tecnologías usadas: Unity, C#</small>
              </Card.Text>
              <Button variant="primary" href="https://vicvaz074.github.io/SkylineWeb/">Ver Proyecto <FaArrowRight /></Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>


      <Container className="my-5" id="contact">
        <Row>
          <Col md={6}>
            <h2>Contacto</h2>
            <p>Para cualquier consulta profesional, no dudes en contactarme a través de los siguientes medios.</p>
            <p><strong>Email:</strong> vicvaz074@outlook.com</p>
            <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/vicvaz074/">vicvaz074</a></p>
            <p><strong>GitHub:</strong> <a href="https://github.com/vicvaz074">vicvaz074</a></p>
            <Button variant="primary" href={curriculmSpanish}>Curriculum en español </Button>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Envíame un mensaje</Card.Title>
                <Card.Text>
                <Form onSubmit={sendEmail}>
                  <Form.Group controlId="from_name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="from_name" placeholder="Ingresa tu nombre" required />
                  </Form.Group>

                  <Form.Group controlId="from_email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="from_email" placeholder="Ingresa tu email" required />
                  </Form.Group>

                  <Form.Group controlId="message">
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control as="textarea" name="message" rows="3" placeholder="Escribe tu mensaje aquí" required />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Enviar
                  </Button>
                </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer className="footer">
        <Container>
          <p className="float-right">
            <a href="#" className="text-white">Volver arriba</a>
          </p>
          <p>© 2024 Vicente Vázquez Ramírez | <a href="mailto:vicvaz074@outlook.com" className="text-white">vicvaz074@outlook.com</a></p>
          <p>
            Encuéntrame en <a href="https://www.linkedin.com/in/vicvaz074/" className="text-white"><FaLinkedin /></a>, <a href="https://github.com/vicvaz074" className="text-white"><FaGithub /></a> para más información.
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default App;
