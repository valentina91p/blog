json.array!(@comentarios) do |comentario|
  json.extract! comentario, :id, :contenido, :fecha, :autor_id, :anonimo
  json.url comentario_url(comentario, format: :json)
end
