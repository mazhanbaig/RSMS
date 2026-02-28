export const generateTxnRef = () => {
  return "T" + new Date().getTime();
};

export const buildJazzCashPayload = (amount: number, customerEmail: string) => {
  const txnRef = generateTxnRef();

  return {
    pp_Version: "1.1",
    pp_TxnType: "MWALLET",
    pp_Language: "EN",
    pp_MerchantID: process.env.NEXT_PUBLIC_JAZZCASH_MERCHANT_ID,
    pp_TxnRefNo: txnRef,
    pp_Amount: (amount * 100).toString(), // convert to paisa
    pp_ReturnURL: process.env.NEXT_PUBLIC_JAZZCASH_RETURN_URL,
    pp_CustomerEmail: customerEmail,
  };
};

export const submitJazzCashForm = (payload: Record<string, string>) => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = process.env.NEXT_PUBLIC_JAZZCASH_SANDBOX_URL!;
  form.target = "_self";

  Object.entries(payload).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};