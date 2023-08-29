from flask import Blueprint, request
from flask_login import current_user, login_required
from .aws_helper import upload_file_to_s3, get_unique_filename
from app.forms.image_form import ImageForm

image_routes = Blueprint("images", __name__)


@image_routes.route("/new", methods=["POST"])
# @login_required
def upload_image():
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        image = form.data["image"]
        temp_url = form.data["temp_url"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return {"errors": upload}

        url = upload["url"]
        return {"temp_url": temp_url, "url": url}

    if form.errors:
        return {"errors": form.errors}
