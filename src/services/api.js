import { encode as btoa } from "base-64";

const BASE_URL = "https://18.156.153.199.nip.io/mg/api/v2";
const USERNAME = "test_username";
const PASSWORD = "DpKeKnwsHM9JMzO";

const encodeCredentials = (username, password) => {
  return btoa(`${username}:${password}`);
};

const getHeaders = () => {
  const encodedCredentials = encodeCredentials(USERNAME, PASSWORD);
  return {
    Authorization: `Basic ${encodedCredentials}`,
    Accept: "application/json",
  };
};

export const postAnswer = async (answer, sessionId = "") => {
  const endpoint = `${BASE_URL}/answer_question`;
  const urlWithParams = sessionId
    ? `${endpoint}?sessionId=${sessionId}&answer=${answer || "maybe"}`
    : `${endpoint}?answer=${answer || "maybe"}`;
  try {
    const response = await fetch(urlWithParams, {
      method: "POST",
      headers: getHeaders(),
      body: "",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Posting answer failed: ${error.message}`);
  }
};

export const postQuestion = async (question, secret) => {
  const endpoint = `${BASE_URL}/ask_question`;
  const urlWithParams = `${endpoint}?question=${question}&secret=${secret || ""}`;
  try {
    const response = await fetch(urlWithParams, {
      method: "POST",
      headers: getHeaders(),
      body: "",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Posting question failed: ${error.message}`);
  }
};