const Component = () => {
  return (
    <div
      className=" "
      style={{
        backgroundColor: "lightpink",
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        paddingRight: "40px",
      }}
    >
      <div className="logo">
        <span style={{ color: "blue" }}>Mekin</span>Jemal
      </div>
      <div className="links">
        <ul style={{ display: "flex", gap: "20px" }}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Portfolio</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Component;
