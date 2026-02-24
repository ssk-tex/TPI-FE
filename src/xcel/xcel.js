import axios from "axios";

export const getToken = async () => {
  try {
    const response = await axios.post(
      "https://ifms.wb.gov.in/wbjitapi/api/Auth/apiuser-login",
      {
        Username: "WBJIT238182",
        Password: "Admin@123",
        RoleId: "53fca267-3629-4d47-8d54-92e535ecec4e",
        SecretKey: "ecc87bf0-f967-4318-a717-9d998529dfb1",
        Fin_Year: "2526",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ return করতে হবে try ব্লকের ভেতরেই
    return response.data;
  } catch (error) {
    console.error("Token API Error:", error.message);
    throw error;
  }
};
