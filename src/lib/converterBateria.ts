interface Bateria {
  bateria: number;
}

export function converterDadosBateria(data: Bateria) {
  const rawData = data.bateria;
  const maxRawData = 3500;
  const maxTensao = 12.4;

  const tensaoAtual = (rawData / maxRawData) * maxTensao;

  return {
    tensao: tensaoAtual.toFixed(2),
  };
}
