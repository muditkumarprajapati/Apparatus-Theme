@extends('layouts.admin')

@section('title')
    Apparatus Theme Settings
@endsection

@section('content-header')
    <h1>Apparatus Theme<small>Configure login aesthetics and animations.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Apparatus Theme</li>
    </ol>
@endsection

@section('content')
<div class="row">
    <div class="col-xs-12">
        <div class="box box-primary">
            <div class="box-header with-border">
                <h3 class="box-title">Theme Information</h3>
            </div>
            <div class="box-body">
                <p><strong>Apparatus-Theme</strong> is loaded and active with the Desert Parallax intro, featuring <strong>JTGPANEL (CLOUD & INFRASTRUCTURE)</strong> background and <strong>ArixByte Login</strong> card.</p>
                <div class="callout callout-info" style="margin-bottom: 0;">
                    <h4>Desert Parallax Animation Active</h4>
                    <p>Layers and mouse-tracking interactively run on the <code>/auth/login</code> page.</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
