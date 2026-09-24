module Errors
  module General
    RECORD_NOT_FOUND = Errors::ApiError.new(
      code: "record_not_found",
      message: "Record not found"
    )
  end
end