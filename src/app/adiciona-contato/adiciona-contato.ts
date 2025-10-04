import { Component } from '@angular/core';
import { Contato, TipoContato } from './contato';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-adiciona-contato',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adiciona-contato.html',
  styleUrls: ['./adiciona-contato.css']
})
export class AdicionaContato {
  contatos: Contato[] = [];
  opcoesContato: string[] = [];
  formContato: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formContato = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      aniversario: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      tipo: [TipoContato.AMIGO, [Validators.required]]
    });

    this.opcoesContato = Object.values(TipoContato);
  }

  adicionar(): void {
    if (this.formContato.invalid) {
      this.formContato.markAllAsTouched();
      return;
    }

    const pessoa = this.formContato.value;
    const aniversario = new Date(pessoa.aniversario);
    const tipo = this.getTipoContato(pessoa.tipo);

    const c = new Contato(pessoa.nome, aniversario, tipo, pessoa.telefone);
    this.contatos.push(c);

    this.limparCampos();
  }

  limparCampos() {
    this.formContato.reset();
    this.formContato.get('tipo')?.setValue(TipoContato.AMIGO);
  }

  getTipoContato(str: string): TipoContato {
    if (str === TipoContato.AMIGO) {
      return TipoContato.AMIGO;
    } else if (str === TipoContato.TRABALHO) {
      return TipoContato.TRABALHO;
    } else if (str === TipoContato.FAMILIA) {
      return TipoContato.FAMILIA;
    } else {
      return TipoContato.OUTRO;
    }
  }
}
