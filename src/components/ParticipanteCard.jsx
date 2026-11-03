function ParticipanteCard({ participante, onVotar }) {
  const estaNaRoca = participante.naRoca;

  return (
    <article
      className={`participante-card ${estaNaRoca ? 'card-roca' : 'card-fora-da-roca'}`}
    >
      {estaNaRoca && <span className="selo-roca">Na roça</span>}
      <img
        className="participante-foto"
        src={participante.foto}
        alt={`Foto de ${participante.nome}`}
        loading="lazy"
      />
      <h2>{participante.nome}</h2>
      {onVotar && (
        <button
          aria-label={`Votar para eliminar ${participante.nome}`}
          className="botao botao-principal participante-votar"
          onClick={() => onVotar(participante)}
          type="button"
        >
          Vote Para Eliminar
        </button>
      )}
    </article>
  );
}

export default ParticipanteCard;
