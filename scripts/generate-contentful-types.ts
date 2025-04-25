import { CFDefinitionsBuilder, V10ContentTypeRenderer } from 'cf-content-types-generator';
import type { CFContentType } from 'cf-content-types-generator';
import * as fs from 'fs';
import * as path from 'path';

interface ContentTypeField {
  id: string;
  name: string;
  type: string;
  localized: boolean;
  required: boolean;
  validations: any[];
  disabled: boolean;
  omitted: boolean;
}

interface ContentType {
  sys: {
    id: string;
    type: 'ContentType';
  };
  name: string;
  fields: ContentTypeField[];
}

async function generateTypes() {
  const builder = new CFDefinitionsBuilder([new V10ContentTypeRenderer()]);
  
  // Find the most recent export file
  const files = fs.readdirSync(process.cwd());
  const exportFile = files
    .filter(file => file.startsWith('contentful-export-') && file.endsWith('.json'))
    .filter(file => !file.includes('error-log'))
    .sort()
    .reverse()[0];
  
  if (!exportFile) {
    throw new Error('No Contentful export file found');
  }

  // Read the content types from Contentful CLI export
  const exportData = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), exportFile), 'utf-8')
  );

  if (!exportData.contentTypes || !Array.isArray(exportData.contentTypes)) {
    throw new Error('No content types found in export file');
  }

  // Add each content type to the builder
  exportData.contentTypes.forEach((contentType: CFContentType) => {
    builder.appendType(contentType);
  });

  // Generate the TypeScript definitions
  const output = builder.toString();

  // Create the directory if it doesn't exist
  const outputDir = path.join(process.cwd(), 'src/lib/contentful');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the output to a file
  fs.writeFileSync(
    path.join(outputDir, 'generated-types.ts'),
    output
  );

  console.log('Successfully generated types in src/lib/contentful/generated-types.ts');
}

generateTypes().catch(console.error); 