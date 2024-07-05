import type { TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportOptions {
  name: string;
}

export const getHelloWorlReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    content: [`hola ${options.name}`],
  };
  return docDefinition;
};
