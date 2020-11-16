import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CpfModule } from "@fikani/forms";
import { TextMaskModule } from "angular2-text-mask";
import { IonicModule } from "ionic-angular";
import { AlertProvider } from "../providers/alert/alert";
import { AgendamentoCardComponent } from "./agendamento-card/agendamento-card";
import { AgendamentoDadosAdicionaisComponent } from "./agendamento-dados-adicionais/agendamento-dados-adicionais";
import { AgendamentoDadosRequerenteInputComponent } from "./agendamento-dados-requerente-input/agendamento-dados-requerente-input";
import { AgendamentoDadosRequerenteComponent } from "./agendamento-dados-requerente/agendamento-dados-requerente";
import { AgendamentoInfoAdicionaisComponent } from "./agendamento-info-adicionais/agendamento-info-adicionais";
import { AgendamentoSelecionarPessoaComponent } from "./agendamento-selecionar-pessoa/agendamento-selecionar-pessoa";
import { AgendamentoServicoCardComponent } from "./agendamento-servico-card/agendamento-servico-card";
import { MenuButtonComponent } from "./menu-button/menu-button";
import { SelectBoxComponentModule } from "./select-box/select-box.module";
import { StepDefaultComponent } from "./step-default/step-default";
import { BrMaskerModule } from "brmasker-ionic-3";
@NgModule({
  declarations: [
    MenuButtonComponent,
    StepDefaultComponent,
    AgendamentoDadosRequerenteComponent,
    AgendamentoDadosAdicionaisComponent,
    AgendamentoDadosRequerenteInputComponent,
    AgendamentoCardComponent,
    AgendamentoServicoCardComponent,
    AgendamentoSelecionarPessoaComponent,
    AgendamentoInfoAdicionaisComponent
  ],
  imports: [
    BrMaskerModule,
    CommonModule,
    FormsModule,
    SelectBoxComponentModule,
    CpfModule,
    TextMaskModule,
    IonicModule
  ],
  exports: [
    MenuButtonComponent,
    StepDefaultComponent,
    AgendamentoDadosRequerenteComponent,
    AgendamentoDadosAdicionaisComponent,
    AgendamentoDadosRequerenteInputComponent,
    AgendamentoCardComponent,
    AgendamentoServicoCardComponent,
    AgendamentoSelecionarPessoaComponent,
    AgendamentoInfoAdicionaisComponent
  ],
  entryComponents: [
    StepDefaultComponent,
    AgendamentoDadosRequerenteComponent,
    AgendamentoDadosAdicionaisComponent,
    AgendamentoDadosRequerenteInputComponent,
    AgendamentoServicoCardComponent,
    AgendamentoSelecionarPessoaComponent,
    AgendamentoInfoAdicionaisComponent
  ],
  providers: [AlertProvider]
})
export class ComponentsModule {}
