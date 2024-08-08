import {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { PrismaInstrumentation } from "@prisma/instrumentation";
import { Resource } from "@opentelemetry/resources";
import { CompressionAlgorithm } from "@opentelemetry/otlp-exporter-base";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";

export const initalizeTracing = () => {
  // Configure the trace provider
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: "Saas backend",
      [SEMRESATTRS_SERVICE_VERSION]: "0.0.1",
    }),
  });

  // Configure how spans are processed and exported. In this case we're sending spans
  // as we receive them to an OTLP-compatible collector (e.g. Jaeger).
  provider.addSpanProcessor(
    new SimpleSpanProcessor(
      new OTLPTraceExporter({
        url: "http://localhost:4317",
        compression: CompressionAlgorithm.GZIP,
      })
    )
  );

  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
      new PrismaInstrumentation(),
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
    ],
  });

  process.on("beforeExit", async () => {
    await provider.shutdown();
  });

  provider.register();
};
