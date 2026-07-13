# Observabilidade

Objetivo

Padronizar logs, métricas e tracing para facilitar triagem de incidentes e monitoramento de saúde do sistema.

Logs

- Logs estruturados (JSON) contendo: timestamp, level, message, request_id, tenant_id, user_id (quando aplicável), path, latency.
- Evitar PII nos logs.

Metrics

- Expor métricas Prometheus: request_latency, request_count, error_count, db_query_duration, redis_hits_miss, job_queue_length.

Tracing

- Instrumentar requests com trace id (OpenTelemetry). Correlacionar trace_id com request_id nos logs.

Health checks

- Liveness: /health/live (process alive)
- Readiness: /health/ready (conexão DB, redis, migrations applied)

Alerting

- Thresholds: error_rate > X, latency P95 > Y, queue backlog > Z

Referências

- docs/architecture/ARCHITECTURE.md
