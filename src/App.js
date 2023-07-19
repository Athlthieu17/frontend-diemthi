import React, { useState } from "react";
import { Form, Button, Table, Spinner } from "react-bootstrap";
import axios from "axios";
import "./App.css"; // Import the CSS file
import { Analytics } from '@vercel/analytics/react';

export const App = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);
  const [resultKhoi, setResultKhoi] = useState(null);
  const [khoi, setKhoi] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // New state for handling errors
  const [errorRank, setErrorRank] = useState(null); // New state for handling errors
  const options = [
    { value: "a", label: "A" },
    { value: "b", label: "B" },
    { value: "c", label: "C" },
    { value: "d", label: "D" },
    { value: "a1", label: "A1" },
    { value: "d7", label: "D7" },
    // Add more options here as needed
  ];
  const getScore = async () => {
    setLoading(true); // Show the spinner when the API call starts
    setResult(null);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.viaipi.io.vn/api/v1/score/sbd=${number}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.request(config);
      setResult(response.data.data);
      console.log(response.data.data);
      setError(null);
    } catch (error) {
      setError("Số báo danh không tồn tại");
      setResultKhoi(null); // Clear the result in case of an error
    } finally {
      // Set loading back to false after the response is received (success or error)
      setLoading(false);
    }
  };
  const rankKhoi = async () => {
    setLoading(true); // Show the spinner when the API call starts
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.viaipi.io.vn/api/v1/khoi/${khoi}/sbd=${number}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.request(config);
      setResultKhoi(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      setResultKhoi(null); // Clear the result in case of an error
      console.log(error);
    } finally {
      // Set loading back to false after the response is received (success or error)
      setLoading(false);
      setError(null);
    }
  };

  const onClickHandler = async () => {
    if (number.length >= 7 && number.length <= 8) {
      await getScore();
      setResultKhoi(null);
    } else {
      setError("Hãy nhập một số báo danh hợp lệ");
      setResult(null);
    }
  };
  const checkDiem = (a, b, c) => {
    return a > 1 && b > 1 && c > 1;
  };
  const checkValid = () => {
    if (khoi === "a")
      return checkDiem(result.toan, result.vat_li, result.hoa_hoc);
    if (khoi === "b")
      return checkDiem(result.toan, result.sinh_hoc, result.hoa_hoc);
    if (khoi === "c")
      return checkDiem(result.ngu_van, result.lich_su, result.dia_li);
    if (khoi === "d")
      return checkDiem(result.toan, result.ngoai_ngu, result.ngoai_ngu);
    if (khoi === "a1")
      return checkDiem(result.toan, result.vat_li, result.ngoai_ngu);
    if (khoi === "d7")
      return checkDiem(result.toan, result.ngoai_ngu, result.hoa_hoc);
  };
  const onClickHandlerKhoi = async () => {
    if (checkValid()) {
      await rankKhoi();
      setErrorRank(null);
    } else {
      setErrorRank("Không có khổi xếp hạng bạn chọn");
      setResultKhoi(null);
    }
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setKhoi(event.target.value);
  };
  const onChangeNumber = (event) => {
    setNumber(event.target.value);
  };

  return (
    <div>
      <header>
        <img className="logo" src="./viaipi_logo.png" alt="header" />
        <p id="text_header">Tra cứu thứ hạng điểm thi THPT Quốc Gia 2023</p>
      </header>
      <div id="container_compare">
        <a
          id="compare_score"
          href="https://drive.google.com/drive/folders/1--LGMfac8yr72TNtniwnfwuNJRoyUkDF"
          target="_blank"
          rel="noreferrer"
        >
          So sánh điểm từng khối của từng tỉnh và cả nước
        </a>
      </div>
      <Form class="enter_sbd">
        <Form.Group controlId="formId">
          <Form.Label style={{ fontWeight: "bold", marginBottom: "10px" }}>
            Nhập số báo danh của bạn:
          </Form.Label>
          <Form.Control
            type="text"
            value={number}
            onChange={onChangeNumber}
            style={{ width: "100%", fontSize: "14px" }}
          />
        </Form.Group>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Button id="score_button" variant="primary" onClick={onClickHandler}>
            Submit
          </Button>
          {loading && (
            <Spinner
              animation="border"
              role="status"
              style={{
                position: "absolute",
                marginTop: "6px",
                marginLeft: "120px",
                width: "1.5rem",
                height: "1.5rem",
                color: "black",
              }}
            />
          )}
        </div>
      </Form>
      {result && (
        <div>
          <h2 id="text_ketqua">Kết quả thi của SBD : {number}</h2>
          <Table
            id="table_ketqua"
            striped
            bordered
            hover
            style={{ tableLayout: "fixed" }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#f0f0f0",
                    width: "50%",
                  }}
                >
                  SBD:
                </td>
                <td style={{ width: "50%", textAlign: "center" }}>
                  {result.sbd}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#f0f0f0",
                    width: "50%",
                  }}
                >
                  Toán:
                </td>
                <td style={{ width: "50%", textAlign: "center" }}>
                  {result.toan}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#f0f0f0",
                    width: "50%",
                  }}
                >
                  Ngữ Văn:
                </td>
                <td style={{ width: "50%", textAlign: "center" }}>
                  {result.ngu_van}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#f0f0f0",
                    width: "50%",
                  }}
                >
                  Ngoại Ngữ:
                </td>
                <td style={{ width: "50%", textAlign: "center" }}>
                  {result.ngoai_ngu}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#f0f0f0",
                    width: "50%",
                  }}
                >
                  Vật lí:
                </td>
                <td style={{ width: "50%", textAlign: "center" }}>
                  {result.vat_li}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#f0f0f0",
                    width: "50%",
                  }}
                >
                  Hoá học:
                </td>
                <td style={{ width: "50%", textAlign: "center" }}>
                  {result.hoa_hoc}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#f0f0f0",
                    width: "50%",
                  }}
                >
                  Sinh học:
                </td>
                <td style={{ width: "50%", textAlign: "center" }}>
                  {result.sinh_hoc}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#f0f0f0",
                    width: "50%",
                  }}
                >
                  Lịch sử:
                </td>
                <td style={{ width: "50%", textAlign: "center" }}>
                  {result.lich_su}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#f0f0f0",
                    width: "50%",
                  }}
                >
                  Địa lí:
                </td>
                <td style={{ width: "50%", textAlign: "center" }}>
                  {result.dia_li}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#f0f0f0",
                    width: "50%",
                  }}
                >
                  GDCD:
                </td>
                <td style={{ width: "50%", textAlign: "center" }}>
                  {result.gdcd}
                </td>
              </tr>
              {/* Add more fields here as needed */}
            </tbody>
          </Table>

          <Form class="rank_khoi">
            <Form.Group controlId="formOptions">
              <Form.Label
                style={{
                  fontWeight: "bold",
                  marginBottom: "10px",
                  marginTop: "20px",
                }}
              >
                Xem xếp hạng theo khối:
              </Form.Label>
              <Form.Control
                as="select"
                value={selectedOption}
                onChange={handleOptionChange}
                style={{ width: "100%", fontSize: "14px" }}
              >
                <option value="">-- Chọn một khối --</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <Button
                id="score_button_khoi"
                variant="primary"
                onClick={onClickHandlerKhoi}
              >
                Submit
              </Button>
              {loading && (
                <Spinner
                  animation="border"
                  role="status"
                  style={{
                    position: "absolute",
                    marginTop: "6px",
                    marginLeft: "120px",
                    width: "1.5rem",
                    height: "1.5rem",
                    color: "black",
                  }}
                />
              )}
            </div>
          </Form>
          {errorRank && <p class="result">{errorRank}</p>}

          {resultKhoi && (
            <div id="rank_khoi">
              <h3>Xếp hạng theo khối {khoi.toUpperCase()}</h3>

              <Table striped bordered hover style={{ tableLayout: "fixed" }}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "#f0f0f0",
                        width: "50%",
                      }}
                    >
                      Tổng điểm:
                    </td>
                    <td style={{ width: "50%", textAlign: "center" }}>
                      {resultKhoi.tong_diem}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "#f0f0f0",
                        width: "50%",
                      }}
                    >
                      Toàn quốc:
                    </td>
                    <td style={{ width: "50%", textAlign: "center" }}>
                      {resultKhoi.xep_hang_toan_quoc}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "#f0f0f0",
                        width: "50%",
                      }}
                    >
                      Tỉnh:
                    </td>
                    <td style={{ width: "50%", textAlign: "center" }}>
                      {resultKhoi.xep_hang_tinh}
                    </td>
                  </tr>
                  {/* Add more fields here as needed */}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      )}
      {error && <p class="result">{error}</p>}
      {/* {!result && <p class="result">Hãy nhập đúng số báo danh</p>} */}
      <br></br>
      <footer>
        <p>
          Copyright by VIAIPI<sup>&copy;</sup> 2023
        </p>
        <p>Bản quyền thuộc về Bộ Giáo Dục và Đào Tạo</p>
        <p>
          <span style={{ display: "inline-block", marginLeft: "5px" }}>
            <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
              <li style={{ display: "inline-block" }}>
                <a class="info" href="https://www.facebook.com/2uandm.hust/">
                  Đường Minh Quân |
                </a>
              </li>
              <li style={{ display: "inline-block", margin: "0 5px" }}>
                <a class="info" href="https://www.facebook.com/HieuAdath.17">
                  Lê Trung Hiếu |
                </a>
              </li>
              <li style={{ display: "inline-block" }}>
                <a class="info" href="https://www.facebook.com/KhaiTran.K66HUST/">
                  Trần Quang Khải
                </a>
              </li>
            </ul>
          </span>
        </p>
      </footer>
      <Analytics />
    </div>
  );
};

// export default App;
