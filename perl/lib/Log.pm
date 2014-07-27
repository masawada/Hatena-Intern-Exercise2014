package Log;
use strict;
use warnings;
use POSIX 'strftime';

# Timezone
$ENV{'TZ'} = "GMT";

sub new {
  my ($class, %args) = @_;
  return bless \%args, $class;
}

sub protocol {
  my $self = shift;
  my @req = split(/ /, $self->{req});
  return $req[2];
}

sub method {
  my $self = shift;
  my @req = split(/ /, $self->{req});
  return $req[0];
}

sub path {
  my $self = shift;
  my @req = split(/ /, $self->{req});
  return $req[1];
}

sub uri {
  my $self = shift;
  return "http://" .  $self->{host} . $self->path
}

sub time {
  my $self = shift;
  return POSIX::strftime "%Y-%m-%dT%H:%M:%S", localtime($self->{epoch});
}

sub to_hash {
  my $self = shift;
  my $result = {
    status => $self->{status},
    time => $self->time,
    size => $self->{size},
    uri => $self->uri,
    method => $self->method,
    referer => $self->{referer}
  };

  if (defined($self->{user})) {
    $result->{user} = $self->{user};
  }

  return $result;
}

1;
