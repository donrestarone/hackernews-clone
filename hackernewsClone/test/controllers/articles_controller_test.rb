require 'test_helper'

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get root_path_path
    assert_response :success
  end

  test "should get api" do
    get internal_api_url
    assert_response :success
  end

  test "internal API is functional" do
  	get internal_api_url(count: 30, type: 'topstories')
  	assert_response :success
  end
end
