const Footer = () => {
  return (
    <footer className="glass-footer py-4">
      <div className="container">
        <p className="text-light">
          App desenvolvido por{" "}
          <a
            href="https://github.com/felipeschirmann"
            target="_blank"
            rel="noreferrer"
          >
            Felipe Schirmann
          </a>
        </p>
        <p className="text-muted">
          <small>
            <strong>Semana Spring React</strong>
            <br />
            Evento promovido pela escola DevSuperior:{" "}
            <a
              href="https://instagram.com/devsuperior.ig"
              target="_blank"
              rel="noreferrer"
            >
              @devsuperior.ig
            </a>
          </small>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
