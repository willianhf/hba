import SchemaBuilder from '@pothos/core';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';

type SchemaBuilderConfig = {
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
};

export const schemaBuilder = new SchemaBuilder<SchemaBuilderConfig>({
  plugins: [SimpleObjectsPlugin]
});

schemaBuilder.scalarType('Date', {
  serialize: (value: Date) => value.toISOString(),
  parseValue: (value: string) => new Date(value)
});
