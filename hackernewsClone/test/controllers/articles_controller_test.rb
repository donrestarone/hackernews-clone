require 'test_helper'

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get articles_index_url
    assert_response :success
  end

  test "should get api" do
    get articles_api_url
    assert_response :success
  end

end
