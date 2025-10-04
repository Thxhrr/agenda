export enum TipoContato {
    AMIGO = 'Amigo(a)', TRABALHO = 'Trabalho',
    FAMILIA = 'Família', OUTRO = 'Outro'
}
export class Contato {
  constructor(
    public nome: string,
    public aniversario: Date,
    public tipo: TipoContato,
    public telefone?: string
  ) {}
}
