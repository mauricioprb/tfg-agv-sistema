interface Bateria {
  bateria: number;
}

export function converterDadosBateria(data: Bateria) {
  const rawData = data.bateria;
  const maxRawData = 1023;
  const maxTensao = 25;

  const tensaoAtual = (rawData / maxRawData) * maxTensao;

  return {
    tensao: tensaoAtual.toFixed(2),
  };
}
