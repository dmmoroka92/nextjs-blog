class ApiErrorsSerializer
  def self.call(errors:)
    new(errors:).call
  end

  def initialize(errors:)
    @errors = errors
  end

  def call
    errors
      .group_by_attribute
      .transform_values do |attribute_errors|
      attribute_errors.map do |error|
        {
          code: error.type.to_s,
          message: error.message
        }
      end
    end
  end

  private

  attr_reader :errors
end
