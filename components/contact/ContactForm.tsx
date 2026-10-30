"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { sendContactRequest } from "@/app/contatti/actions";
import {
  initialContactState,
  isRequestType,
  readContactForm,
  requestTypes,
  validateContact,
  type ContactFields,
  type FieldErrors,
  type RequestType,
} from "@/lib/contact";

const inputClass =
  "mt-2 block min-h-13 w-full border bg-[#FBF8F4] px-4 py-3 text-base text-[#3B2118] placeholder:text-[#A39488] transition-colors duration-300 focus:border-[#4A281B] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A281B]";

const labelClass =
  "text-[11px] font-medium uppercase tracking-[0.18em] text-[#4A281B]";

function Field({
  name,
  label,
  optional,
  error,
  children,
}: {
  name: keyof ContactFields;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`f-${name}`} className={labelClass}>
        {label}
        {optional ? (
          <span className="ml-2 normal-case tracking-normal text-[#6F625A]">
            (facoltativo)
          </span>
        ) : (
          <span aria-hidden="true" className="ml-1 text-[#7A5F49]">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`f-${name}-error`} className="mt-2 text-sm text-[#9B2C1F]">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm({
  initialType,
  unit,
  accommodation,
}: {
  initialType?: string | null;
  unit?: string | null;
  accommodation?: string | null;
}) {
  const [state, formAction, pending] = useActionState(
    sendContactRequest,
    initialContactState,
  );
  const [type, setType] = useState<RequestType | "">(
    isRequestType(initialType) ? initialType : "",
  );
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [startedAt, setStartedAt] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);

  // Il timestamp di inizio compilazione serve al controllo antispam
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- valore disponibile solo nel browser
    setStartedAt(String(Date.now()));
  }, []);

  // Porta il messaggio di esito in vista e al focus dopo l'invio
  useEffect(() => {
    if (state.status !== "idle") {
      statusRef.current?.focus();
    }
  }, [state]);

  const errors: FieldErrors = { ...state.errors, ...clientErrors };
  const values = state.values;
  const isStay = type === "soggiorno";
  const isEvent =
    type === "cerimonia" || type === "evento-privato" || type === "meeting";

  const describedBy = (name: keyof ContactFields) =>
    errors[name] ? `f-${name}-error` : undefined;

  const borderFor = (name: keyof ContactFields) =>
    errors[name] ? "border-[#9B2C1F]" : "border-[#D8CABB]";

  const defaultMessage =
    values.messaggio ??
    (unit
      ? `Vorrei ricevere informazioni sulla disponibilità di: ${unit.replace(/-/g, " ")}.`
      : accommodation
        ? `Vorrei ricevere informazioni sulla disponibilità di un${accommodation === "camera" ? "a camera" : " appartamento"}.`
        : "");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const found = validateContact(readContactForm(new FormData(event.currentTarget)));

    setClientErrors(found);

    if (Object.keys(found).length > 0) {
      event.preventDefault();
      const first = Object.keys(found)[0];
      const target =
        first === "tipo"
          ? event.currentTarget.querySelector<HTMLElement>('input[name="tipo"]')
          : event.currentTarget.querySelector<HTMLElement>(`#f-${first}`);
      target?.focus();
    }
  }

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border border-[#D8CABB] bg-[#FBF8F4] px-6 py-12 text-center sm:px-10"
      >
        <span
          aria-hidden="true"
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C8AD92] text-lg text-[#4A281B]"
        >
          ✓
        </span>
        <h2 className="mt-6 text-3xl tracking-[-0.025em] text-[#3B2118]">
          Richiesta inviata
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[#6D625B]">
          {state.message}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center justify-center border border-[#CDB9A7] px-6 text-[11px] font-medium uppercase tracking-[0.16em] text-[#4A281B] hover:border-[#4A281B]"
        >
          Torna alla home
        </Link>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="form-note"
      className="space-y-8"
    >
      {/* ESITO */}
      <div ref={statusRef} tabIndex={-1} aria-live="polite">
        {state.status === "error" && state.message && (
          <p
            role="alert"
            className="border border-[#E3C3BC] bg-[#FBF1EE] px-5 py-4 text-sm leading-6 text-[#7E2418]"
          >
            {state.message}
          </p>
        )}
      </div>

      {/* TIPO DI RICHIESTA */}
      <fieldset aria-describedby={describedBy("tipo")}>
        <legend className={labelClass}>
          Tipo di richiesta
          <span aria-hidden="true" className="ml-1 text-[#7A5F49]">
            *
          </span>
        </legend>

        <div className="mt-3 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 lg:grid-cols-3">
          {requestTypes.map((option) => (
            <label
              key={option.value}
              className={`flex min-h-12 cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#4A281B] ${
                type === option.value
                  ? "border-[#4A281B] bg-[#4A281B] text-white"
                  : "border-[#D8CABB] bg-[#FBF8F4] text-[#4A281B] hover:border-[#A58B73]"
              }`}
            >
              <input
                type="radio"
                name="tipo"
                value={option.value}
                checked={type === option.value}
                onChange={() => setType(option.value)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`h-3 w-3 shrink-0 rounded-full border ${
                  type === option.value ? "border-white bg-white" : "border-[#A58B73]"
                }`}
              />
              {option.label}
            </label>
          ))}
        </div>

        {errors.tipo && (
          <p id="f-tipo-error" className="mt-2 text-sm text-[#9B2C1F]">
            {errors.tipo}
          </p>
        )}
      </fieldset>

      {/* DATI PERSONALI */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field name="nome" label="Nome e cognome" error={errors.nome}>
            <input
              id="f-nome"
              name="nome"
              type="text"
              autoComplete="name"
              required
              maxLength={120}
              defaultValue={values.nome}
              aria-invalid={Boolean(errors.nome)}
              aria-describedby={describedBy("nome")}
              className={`${inputClass} ${borderFor("nome")}`}
            />
          </Field>
        </div>

        <Field name="email" label="Email" error={errors.email}>
          <input
            id="f-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={200}
            defaultValue={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={`${inputClass} ${borderFor("email")}`}
          />
        </Field>

        <Field name="telefono" label="Telefono" optional error={errors.telefono}>
          <input
            id="f-telefono"
            name="telefono"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            defaultValue={values.telefono}
            aria-invalid={Boolean(errors.telefono)}
            aria-describedby={describedBy("telefono")}
            className={`${inputClass} ${borderFor("telefono")}`}
          />
        </Field>
      </div>

      {/* DATE E OSPITI */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          name="data"
          label={isStay ? "Data di arrivo" : "Data indicativa"}
          optional
          error={errors.data}
        >
          <input
            id="f-data"
            name="data"
            type="date"
            defaultValue={values.data}
            aria-invalid={Boolean(errors.data)}
            aria-describedby={describedBy("data")}
            className={`${inputClass} ${borderFor("data")}`}
          />
        </Field>

        {isStay ? (
          <Field name="dataFine" label="Data di partenza" optional error={errors.dataFine}>
            <input
              id="f-dataFine"
              name="dataFine"
              type="date"
              defaultValue={values.dataFine}
              aria-invalid={Boolean(errors.dataFine)}
              aria-describedby={describedBy("dataFine")}
              className={`${inputClass} ${borderFor("dataFine")}`}
            />
          </Field>
        ) : (
          <Field
            name="ospiti"
            label={isEvent ? "Numero indicativo di ospiti" : "Numero di persone"}
            optional
            error={errors.ospiti}
          >
            <input
              id="f-ospiti"
              name="ospiti"
              type="number"
              inputMode="numeric"
              min={1}
              max={2000}
              defaultValue={values.ospiti}
              aria-invalid={Boolean(errors.ospiti)}
              aria-describedby={describedBy("ospiti")}
              className={`${inputClass} ${borderFor("ospiti")}`}
            />
          </Field>
        )}

        {isStay && (
          <Field name="ospiti" label="Numero di ospiti" optional error={errors.ospiti}>
            <input
              id="f-ospiti"
              name="ospiti"
              type="number"
              inputMode="numeric"
              min={1}
              max={2000}
              defaultValue={values.ospiti}
              aria-invalid={Boolean(errors.ospiti)}
              aria-describedby={describedBy("ospiti")}
              className={`${inputClass} ${borderFor("ospiti")}`}
            />
          </Field>
        )}
      </div>

      {/* MESSAGGIO */}
      <Field name="messaggio" label="Messaggio" error={errors.messaggio}>
        <textarea
          id="f-messaggio"
          name="messaggio"
          required
          rows={6}
          maxLength={4000}
          defaultValue={defaultMessage}
          placeholder="Raccontaci la tua idea, il periodo che hai in mente ed eventuali esigenze particolari."
          aria-invalid={Boolean(errors.messaggio)}
          aria-describedby={describedBy("messaggio")}
          className={`${inputClass} ${borderFor("messaggio")} resize-y`}
        />
      </Field>

      {/* CAMPI NASCOSTI */}
      <input type="hidden" name="unita" value={unit ?? values.unita ?? ""} />
      <input type="hidden" name="startedAt" value={startedAt} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Sito web</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* PRIVACY */}
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#6D625B]">
          <input
            id="f-privacy"
            name="privacy"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.privacy)}
            aria-describedby={describedBy("privacy")}
            className="mt-1 h-5 w-5 shrink-0 accent-[#4A281B]"
          />
          <span>
            Ho letto l&apos;
            <Link
              href="/privacy-policy"
              target="_blank"
              className="text-[#4A281B] underline decoration-[#C8AD92] underline-offset-4"
            >
              informativa sulla privacy
            </Link>{" "}
            e acconsento al trattamento dei miei dati per ricevere una
            risposta alla mia richiesta.
            <span aria-hidden="true" className="ml-1 text-[#7A5F49]">
              *
            </span>
          </span>
        </label>
        {errors.privacy && (
          <p id="f-privacy-error" className="mt-2 text-sm text-[#9B2C1F]">
            {errors.privacy}
          </p>
        )}
      </div>

      {/* INVIO */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="text-xs leading-5 text-[#6F625A]">
          I campi contrassegnati con * sono obbligatori.
        </p>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-14 items-center justify-center gap-4 bg-[#4A281B] px-10 text-[11px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-[#5B3325] disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Invio in corso…" : "Invia la richiesta"}
          {!pending && <span aria-hidden="true">→</span>}
        </button>
      </div>
    </form>
  );
}
