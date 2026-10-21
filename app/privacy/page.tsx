import { Metadata } from 'next'
import { site } from 'app/config'
import { baseUrl } from 'app/sitemap'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'Informativa sul trattamento dei dati personali di pasqualinosorice.com.',
  alternates: {
    canonical: `${baseUrl}/privacy`
  }
}

export default function Page() {
  return (
    <section>
      <h1 className='display title text-ink mb-10 text-4xl sm:text-5xl'>Informativa privacy</h1>
      <div className='prose'>
        <h2>Titolare del trattamento</h2>
        <p>
          {site.name}, contattabile all’indirizzo{' '}
          <a href={`mailto:${site.email}`} className='interlink'>
            {site.email}
          </a>
          .
        </p>

        <h2>Quali dati tratto e perché</h2>
        <ul>
          <li>
            <strong>Statistiche di visita.</strong> Il sito usa Vercel Web Analytics e Speed
            Insights, che raccolgono dati aggregati e anonimi su pagine visitate e prestazioni,
            senza cookie e senza identificare i visitatori.
          </li>
          <li>
            <strong>Email.</strong> Se mi scrivi, uso il tuo indirizzo e il contenuto del messaggio
            solo per risponderti e per gestire un’eventuale collaborazione. I messaggi indirizzati a
            questo dominio vengono inoltrati da Cloudflare a una casella Gmail.
          </li>
          <li>
            <strong>Dati tecnici.</strong> Il sito è ospitato da Vercel, che per motivi di sicurezza
            e funzionamento può registrare dati tecnici delle richieste, come l’indirizzo IP.
          </li>
        </ul>

        <h2>Cookie</h2>
        <p>Il sito non usa cookie di profilazione né cookie di terze parti.</p>

        <h2>Per quanto tempo</h2>
        <p>
          Conservo le email per il tempo necessario a gestire la richiesta e l’eventuale rapporto
          professionale, e comunque nei limiti previsti dalla legge.
        </p>

        <h2>I tuoi diritti</h2>
        <p>
          Puoi chiedere in qualsiasi momento accesso, rettifica, cancellazione o limitazione dei
          tuoi dati, oppure opporti al trattamento, scrivendo a {site.email}. Hai anche il diritto
          di proporre reclamo al Garante per la protezione dei dati personali.
        </p>
      </div>
    </section>
  )
}
