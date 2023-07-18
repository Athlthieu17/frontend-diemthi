import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import axios from "axios";

export const App = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);
  const [resultKhoi, setResultKhoi] = useState(null);
  const [khoi, setKhoi] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    { value: "a", label: "A" },
    { value: "b", label: "B" },
    { value: "c", label: "C" },
    { value: "d", label: "D" },
    { value: "a1", label: "A1" },
    { value: "d7", label: "D7" },
    // Add more options here as needed
  ];

  const getScore = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://103.70.12.246/api/v1/score/sbd=${number}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setResult(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        setResult(null); // Clear the result in case of an error
        console.log(error);
      });
  };

  const rankKhoi = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://103.70.12.246/api/v1/khoi/${khoi}/sbd=${number}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setResultKhoi(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        setResultKhoi(null); // Clear the result in case of an error
        console.log(error);
      });
  };

  const onClickHandler = async () => {
    if (number.length >= 7 && number.length <= 8) {
      await getScore();
      setResultKhoi(null);
    } else setResult(null);
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
    } else setResultKhoi(null);
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
    <img
      src="./viaipi_logo.png"
      alt="header"
      style={{
        width: "100px",
        height: "74px",
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
    <p
      id="text_header"
      style={{
        position: "absolute",
        top: "65%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "Roboto",
        fontWeight: "500",
        fontSize: "larger",
      }}
    >
      Tra cứu thứ hạng điểm thi THPT Quốc Gia 2023
    </p>
  </header>
      <Form style="width: 90%; margin: 0 auto;">
        <Form.Group controlId="formId">
          <Form.Label style="font-weight: bold; margin-bottom: 10px;">Nhập số báo danh của bạn:</Form.Label>
          <Form.Control type="text" value={number} onChange={onChangeNumber} style="width: 100%; font-size: 14px;" />
        </Form.Group>
        <div style="display: flex; justify-content: center; margin-top: 10px;">
          <Button id="score_button" variant="primary" onClick={onClickHandler}>Submit</Button>
        </div>
      </Form>
      {result && (
        <div style="position: relative; top: 20px;">
          <h2 id="text_ketqua" style="text-align: left; font-size: larger;">Kết quả thi của SBD : {number}</h2>
          <Table id="table_ketqua" striped bordered hover style="table-layout: fixed;">
            <tbody>
              <tr>
                <td style="font-weight: bold; background-color: #f0f0f0; width: 50%;">SBD:</td>
                <td style="width: 50%; text-align: center;">{result.sbd}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; background-color: #f0f0f0; width: 50%;">Toán:</td>
                <td style="width: 50%; text-align: center;">{result.toan}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; background-color: #f0f0f0; width: 50%;">Ngữ Văn:</td>
                <td style="width: 50%; text-align: center;">{result.ngu_van}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; background-color: #f0f0f0; width: 50%;">Ngoại Ngữ:</td>
                <td style="width: 50%; text-align: center;">{result.ngoai_ngu}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; background-color: #f0f0f0; width: 50%;">Vật lí:</td>
                <td style="width: 50%; text-align: center;">{result.vat_li}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; background-color: #f0f0f0; width: 50%;">Hoá học:</td>
                <td style="width: 50%; text-align: center;">{result.hoa_hoc}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; background-color: #f0f0f0; width: 50%;">Sinh học:</td>
                <td style="width: 50%; text-align: center;">{result.sinh_hoc}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; background-color: #f0f0f0; width: 50%;">Lịch sử:</td>
                <td style="width: 50%; text-align: center;">{result.lich_su}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; background-color: #f0f0f0; width: 50%;">Địa lí:</td>
                <td style="width: 50%; text-align: center;">{result.dia_li}</td>
              </tr>
              <tr>
                <td style="font-weight: bold; background-color: #f0f0f0; width: 50%;">GDCD:</td>
                <td style="width: 50%; text-align: center;">{result.gdcd}</td>
              </tr>
              {/* Add more fields here as needed */}
            </tbody>
          </Table>
          <Form style="position: relative; top: 20px;">
            <Form.Group controlId="formOptions">
              <Form.Label style="font-weight: bold; margin-bottom: 10px;">Xem xếp hạng theo khối:</Form.Label>
              <Form.Control as="select" value={selectedOption} onChange={handleOptionChange} style="width: 100%; font-size: 14px;">
                <option value="">-- Chọn một khối --</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <div style="display: flex; justify-content: center; margin-top: 10px;">
              <Button variant="primary" onClick={onClickHandlerKhoi}>Submit</Button>
            </div>
          </Form>
          {!resultKhoi && <p class="result" style="text-indent: 5%; color: red; font-weight: 500; position: relative; top: 10px; bottom: 20px;">Không có xếp hạng khối bạn chọn</p>}
          {resultKhoi && (
            <div id="rank_khoi">
              <h2>Xếp hạng theo khối {khoi.toUpperCase()}</h2>
              <Table striped bordered hover style="table-layout: fixed;">
                <tbody>
                  <tr>
                    <td style="font-weight: bold; background-color: #f0f0f0; width: 50%;">Tổng điểm:</td>
                    <td style="width: 50%; text-align: center;">{resultKhoi.tong_diem}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; background-color: #f0f0f0; width: 50%;">Xếp hạng toàn quốc:</td>
                    <td style="width: 50%; text-align: center;">{resultKhoi.xep_hang_toan_quoc}</td>
                  </tr>
                  <tr>
                    <td style="font-weight: bold; background-color: #f0f0f0; width: 50%;">Xếp hạng tỉnh:</td>
                    <td style="width: 50%; text-align: center;">{resultKhoi.xep_hang_tinh}</td>
                  </tr>
                  {/* Add more fields here as needed */}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      )}

      {!result && <p class="result" style="text-indent: 5%; color: red; font-weight: 500; position: relative; top: 10px; bottom: 20px;">Hãy nhập đúng số báo danh</p>}
      <footer style="height: 70px; position: relative; text-align: center; font-size: large; font-family: 'Roboto'; font-weight: 500;">
        <p>Copyright by VIAIPI 2023 - Bản quyền thuộc về Bộ Giáo Dục và Đào Tạo</p>
        Author: <a href="https://www.facebook.com/2uandm.hust/">Đường Minh Quân</a> - <a href="https://www.facebook.com/HieuAdath.17">Lê Trung Hiếu</a> - <a href="https://www.facebook.com/KhaiTran.K66HUST/">Trần Quang Khải</a>
      </footer>
    </div>
  );
};
