import React from 'react';
import { Shield, PieChart, FileText, CheckCircle, Info } from 'lucide-react';
import { APP_CONFIG } from '../config';

export const Transparency: React.FC = () => {
  return (
    <section
      id="transparencia"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 relative border-t border-neutral-900"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Prestação de Contas Aberta</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            TRANSPARÊNCIA
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg mt-3">
            Acompanhe como as doações são utilizadas para apoiar a causa animal.
          </p>
        </div>

        {/* Main Transparency Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          {/* Commitment Note */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-neutral-950/70 border border-neutral-800">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm text-neutral-300 space-y-1">
              <p className="font-bold text-white">
                Compromisso com a Verdade e a Ética
              </p>
              <p>
                As informações financeiras e comprovantes de gastos são registrados e disponibilizados
                periodicamente aos apoiadores. Abaixo você confere o modelo de alocação de recursos:
              </p>
            </div>
          </div>

          {/* Allocation Breakdown Guidelines */}
          <div>
            <h3 className="text-sm font-bold text-neutral-200 uppercase tracking-wide mb-4">
              Diretrizes de Distribuição dos Recursos:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neutral-400 font-medium">Alimentação</span>
                  <span className="text-xs font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10">
                    Prioritário
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Compra recorrente de sacos de ração para cães e gatos, sachês nutritivos e alimentação especial para filhotes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neutral-400 font-medium">Cuidados Clínicos</span>
                  <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
                    Emergencial
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Consultas veterinárias emergenciais, exames de sangue, radiografias e procedimentos cirúrgicos urgentes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neutral-400 font-medium">Medicamentos</span>
                  <span className="text-xs font-bold text-sky-400 px-2 py-0.5 rounded bg-sky-500/10">
                    Contínuo
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Antibióticos, anti-inflamatórios, analgésicos, pomadas cicatrizantes, vermífugos e antipulgas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-neutral-400 font-medium">Proteção & Resgate</span>
                  <span className="text-xs font-bold text-purple-400 px-2 py-0.5 rounded bg-purple-500/10">
                    Logística
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Combustível para resgate, caixas de transporte, cobertores, coleiras e itens de acolhimento térmico.
                </p>
              </div>
            </div>
          </div>

          {/* Verification & Requesting receipts */}
          <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Dúvidas sobre o uso das doações? Solicite detalhes via e-mail ou WhatsApp oficial.</span>
            </div>
            <a
              href="#contato"
              className="text-amber-400 hover:underline font-bold whitespace-nowrap"
            >
              Falar com a equipe →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
