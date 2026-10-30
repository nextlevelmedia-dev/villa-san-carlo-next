/** Logica condivisa client/server del modulo di contatto */

export const requestTypes = [
  { value: "cerimonia", label: "Cerimonia o ricevimento" },
  { value: "evento-privato", label: "Evento privato" },
  { value: "meeting", label: "Meeting o evento aziendale" },
  { value: "soggiorno", label: "Soggiorno" },
  { value: "visita", label: "Visita della villa" },
  { value: "altro", label: "Altro" },
] as const;

export type RequestType = (typeof requestTypes)[number]["value"];

export const isRequestType = (value: unknown): value is RequestType =>
  requestTypes.some((type) => type.value === value);

export type ContactFields = {
  tipo: string;
  nome: string;
  email: string;
  telefono: string;
  data: string;
  dataFine: string;
  ospiti: string;
  messaggio: string;
  privacy: string;
  unita: string;
};

export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: FieldErrors;
  values: Partial<ContactFields>;
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s./-]{6,20}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function validateContact(values: ContactFields): FieldErrors {
  const errors: FieldErrors = {};

  if (!isRequestType(values.tipo)) {
    errors.tipo = "Seleziona il tipo di richiesta.";
  }

  if (values.nome.trim().length < 2) {
    errors.nome = "Inserisci il tuo nome e cognome.";
  } else if (values.nome.length > 120) {
    errors.nome = "Il nome è troppo lungo.";
  }

  if (!EMAIL.test(values.email.trim()) || values.email.length > 200) {
    errors.email = "Inserisci un indirizzo email valido.";
  }

  if (values.telefono.trim() && !PHONE.test(values.telefono.trim())) {
    errors.telefono = "Inserisci un numero di telefono valido.";
  }

  if (values.data && !DATE.test(values.data)) {
    errors.data = "Inserisci una data valida.";
  }

  if (values.dataFine) {
    if (!DATE.test(values.dataFine)) {
      errors.dataFine = "Inserisci una data valida.";
    } else if (values.data && values.dataFine < values.data) {
      errors.dataFine = "La partenza deve seguire l'arrivo.";
    }
  }

  if (values.ospiti) {
    const guests = Number(values.ospiti);
    if (!Number.isInteger(guests) || guests < 1 || guests > 2000) {
      errors.ospiti = "Inserisci un numero di ospiti valido.";
    }
  }

  const message = values.messaggio.trim();
  if (message.length < 10) {
    errors.messaggio = "Raccontaci qualcosa in più (almeno 10 caratteri).";
  } else if (message.length > 4000) {
    errors.messaggio = "Il messaggio è troppo lungo (massimo 4000 caratteri).";
  }

  if (values.privacy !== "on") {
    errors.privacy = "È necessario accettare l'informativa privacy.";
  }

  return errors;
}

export function readContactForm(formData: FormData): ContactFields {
  const get = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };

  return {
    tipo: get("tipo"),
    nome: get("nome"),
    email: get("email"),
    telefono: get("telefono"),
    data: get("data"),
    dataFine: get("dataFine"),
    ospiti: get("ospiti"),
    messaggio: get("messaggio"),
    privacy: get("privacy"),
    unita: get("unita"),
  };
}
